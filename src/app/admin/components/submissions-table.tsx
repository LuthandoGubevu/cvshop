"use client";

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Download, Upload, Send, CheckCircle, Clock, Hourglass } from 'lucide-react';

import { type Submission, updateSubmissionStatus, handleUpgradedCvUpload, sendEmailAction } from '../actions';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

interface SubmissionsTableProps {
  initialSubmissions: Submission[];
}

export default function SubmissionsTable({ initialSubmissions }: SubmissionsTableProps) {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleStatusChange = async (id: string, newStatus: Submission['status']) => {
    setLoading(prev => ({ ...prev, [`status-${id}`]: true }));
    const result = await updateSubmissionStatus(id, newStatus);
    if (result.error) {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    } else {
      setSubmissions(subs => subs.map(s => s.id === id ? { ...s, status: newStatus } : s));
      toast({ title: 'Success', description: 'Status updated successfully.' });
    }
    setLoading(prev => ({ ...prev, [`status-${id}`]: false }));
  };

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>, submissionId: string) => {
    e.preventDefault();
    setUploading(submissionId);
    const formData = new FormData(e.currentTarget);
    const result = await handleUpgradedCvUpload(submissionId, formData);
    
    if (result.error) {
      toast({ variant: 'destructive', title: 'Upload Failed', description: result.error });
    } else {
      setSubmissions(subs => subs.map(s => s.id === submissionId ? { ...s, upgradedCvUrl: result.url } : s));
      toast({ title: 'Upload Successful', description: 'Upgraded CV has been uploaded.' });
      // Close dialog by managing open state if we control it from here
    }
    setUploading(null);
  };

  const handleSendEmail = async (submissionId: string) => {
    setLoading(prev => ({ ...prev, [`email-${submissionId}`]: true }));
    const result = await sendEmailAction(submissionId);
    if (result.error) {
      toast({ variant: 'destructive', title: 'Email Failed', description: result.error });
    } else {
      setSubmissions(subs => subs.map(s => s.id === submissionId ? { ...s, status: 'completed' } : s));
      toast({ title: 'Email Sent', description: 'The upgraded CV has been sent to the user.' });
    }
    setLoading(prev => ({ ...prev, [`email-${submissionId}`]: false }));
  };

  const StatusBadge = ({ status }: { status: Submission['status'] }) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Hourglass className="mr-1 h-3 w-3" />Pending</Badge>;
      case 'in-progress':
        return <Badge className="bg-sky-500 text-white"><Clock className="mr-1 h-3 w-3" />In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-600 text-white"><CheckCircle className="mr-1 h-3 w-3" />Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (submissions.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <h3 className="text-xl font-semibold">No Submissions Yet</h3>
            <p className="text-sm text-muted-foreground">When users submit their CVs, they will appear here.</p>
        </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Career Goals</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map(sub => (
            <TableRow key={sub.id}>
              <TableCell>
                <div className="font-medium">{sub.name}</div>
                <div className="text-sm text-muted-foreground">{sub.email}</div>
              </TableCell>
              <TableCell className="max-w-xs truncate">
                <p className="text-sm">{sub.careerGoals}</p>
              </TableCell>
              <TableCell>{formatDistanceToNow(new Date(sub.submittedAt as Date), { addSuffix: true })}</TableCell>
              <TableCell>
                <StatusBadge status={sub.status} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Select
                    defaultValue={sub.status}
                    onValueChange={(newStatus) => handleStatusChange(sub.id, newStatus as Submission['status'])}
                    disabled={loading[`status-${sub.id}`]}
                  >
                    <SelectTrigger className="w-[140px] h-9">
                      <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button asChild variant="outline" size="icon" disabled={!sub.cvUrl.startsWith('http')}>
                    <Link href={sub.cvUrl} target="_blank"><Download /></Link>
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon"><Upload /></Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload Upgraded CV for {sub.name}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={(e) => handleFileUpload(e, sub.id)} className="space-y-4">
                        <Input type="file" name="file" required />
                        <Button type="submit" disabled={uploading === sub.id}>
                          {uploading === sub.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Upload
                        </Button>
                      </form>
                      {sub.upgradedCvUrl && (
                        <p className="text-sm text-green-600">Upgraded CV already uploaded. <Link href={sub.upgradedCvUrl} target='_blank' className='underline'>View</Link></p>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Button
                    size="icon"
                    onClick={() => handleSendEmail(sub.id)}
                    disabled={!sub.upgradedCvUrl || loading[`email-${sub.id}`] || sub.status === 'completed'}
                  >
                    {loading[`email-${sub.id}`] ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send />}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
