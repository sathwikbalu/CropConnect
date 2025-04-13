
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Badge,
} from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RequireAuth from '@/components/auth/RequireAuth';
import RequireFarmer from '@/components/auth/RequireFarmer';
import { fetchReceivedRequests, fetchSentRequests, updateRequestStatus } from '@/services/resourceService';

interface ResourceRequest {
  _id: string;
  resourceId: string;
  resourceTitle: string;
  requesterId: string;
  requesterName: string;
  ownerId: string;
  ownerName: string;
  message: string;
  startDate: string;
  endDate: string;
  paymentType: 'money' | 'barter';
  paymentDetails: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  createdAt: string;
}

const RequestsPage = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [receivedRequests, setReceivedRequests] = useState<ResourceRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<ResourceRequest[]>([]);
  const [loadingReceived, setLoadingReceived] = useState(true);
  const [loadingSent, setLoadingSent] = useState(true);
  
  useEffect(() => {
    fetchRequests();
  }, []);
  
  const fetchRequests = async () => {
    try {
      setLoadingReceived(true);
      setLoadingSent(true);
      
      // Fetch received requests
      const receivedData = await fetchReceivedRequests();
      setReceivedRequests(receivedData);
      setLoadingReceived(false);
      
      // Fetch sent requests
      const sentData = await fetchSentRequests();
      setSentRequests(sentData);
      setLoadingSent(false);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast({
        title: 'Error',
        description: 'Could not load requests. Please try again.',
        variant: 'destructive',
      });
      setLoadingReceived(false);
      setLoadingSent(false);
    }
  };
  
  const handleStatusChange = async (requestId: string, newStatus: 'approved' | 'rejected') => {
    try {
      await updateRequestStatus(requestId, newStatus);
      
      // Update the local state
      setReceivedRequests(receivedRequests.map(request => 
        request._id === requestId ? { ...request, status: newStatus } : request
      ));
      
      toast({
        title: `Request ${newStatus}`,
        description: `You have ${newStatus} the resource request.`,
      });
    } catch (error) {
      console.error('Error updating request status:', error);
      toast({
        title: 'Error',
        description: 'Could not update request status. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-semibold mb-6">Resource Requests</h1>
        
        <Tabs defaultValue="received" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="received">Received Requests</TabsTrigger>
            <TabsTrigger value="sent">Sent Requests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="received">
            <Card>
              <CardHeader>
                <CardTitle>Received Requests</CardTitle>
                <CardDescription>Manage requests from other farmers for your resources</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingReceived ? (
                  <div className="text-center py-8">Loading requests...</div>
                ) : receivedRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <p>You don't have any received resource requests yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Resource</TableHead>
                          <TableHead>Requester</TableHead>
                          <TableHead>Dates</TableHead>
                          <TableHead>Payment</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {receivedRequests.map((request) => (
                          <TableRow key={request._id}>
                            <TableCell className="font-medium">{request.resourceTitle}</TableCell>
                            <TableCell>{request.requesterName}</TableCell>
                            <TableCell>
                              {formatDate(request.startDate)} - {formatDate(request.endDate)}
                            </TableCell>
                            <TableCell>
                              <span className="capitalize">{request.paymentType}</span>: {request.paymentDetails}
                            </TableCell>
                            <TableCell>
                              <Badge className={
                                request.status === 'approved' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                                request.status === 'rejected' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                                request.status === 'cancelled' ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' :
                                'bg-blue-100 text-blue-800 hover:bg-blue-200'
                              }>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              {request.status === 'pending' && (
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="border-green-500 text-green-600 hover:bg-green-50"
                                    onClick={() => handleStatusChange(request._id, 'approved')}
                                  >
                                    Approve
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="border-red-500 text-red-600 hover:bg-red-50"
                                    onClick={() => handleStatusChange(request._id, 'rejected')}
                                  >
                                    Reject
                                  </Button>
                                </div>
                              )}
                              {request.status !== 'pending' && (
                                <span className="text-sm text-gray-500">No actions available</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sent">
            <Card>
              <CardHeader>
                <CardTitle>Sent Requests</CardTitle>
                <CardDescription>Track the status of requests you've sent to other farmers</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingSent ? (
                  <div className="text-center py-8">Loading requests...</div>
                ) : sentRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <p>You haven't sent any resource requests yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Resource</TableHead>
                          <TableHead>Owner</TableHead>
                          <TableHead>Dates</TableHead>
                          <TableHead>Payment</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Requested On</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sentRequests.map((request) => (
                          <TableRow key={request._id}>
                            <TableCell className="font-medium">{request.resourceTitle}</TableCell>
                            <TableCell>{request.ownerName}</TableCell>
                            <TableCell>
                              {formatDate(request.startDate)} - {formatDate(request.endDate)}
                            </TableCell>
                            <TableCell>
                              <span className="capitalize">{request.paymentType}</span>: {request.paymentDetails}
                            </TableCell>
                            <TableCell>
                              <Badge className={
                                request.status === 'approved' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                                request.status === 'rejected' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                                request.status === 'cancelled' ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' :
                                'bg-blue-100 text-blue-800 hover:bg-blue-200'
                              }>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>{formatDate(request.createdAt)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default function ProtectedRequestsPage() {
  return (
    <RequireAuth>
      <RequireFarmer>
        <RequestsPage />
      </RequireFarmer>
    </RequireAuth>
  );
}
