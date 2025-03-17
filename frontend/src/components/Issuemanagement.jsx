import React from 'react';
import './Issuemanagement.css';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Filter, Search } from "lucide-react";

const Issuemanagement = () => {
  const mockIssues = [
    { id: 1, title: "Course Registration Issue", category: "Registration", status: "Open", date: "2024-01-15" },
    { id: 2, title: "Missing Grades", category: "Academic", status: "In Progress", date: "2024-01-14" },
    { id: 3, title: "Login Problem", category: "Technical", status: "Resolved", date: "2024-01-13" },
  ];

  const getStatusStyle = (status) => {
    switch(status.toLowerCase()) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Issue Management</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <FiPlus size={20} />
          New Issue
        </Button>
      </div>

      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-96">
              <Input
                placeholder="Search issues..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border-gray-200"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-600">Issue</TableHead>
                  <TableHead className="font-semibold text-gray-600">Category</TableHead>
                  <TableHead className="font-semibold text-gray-600">Status</TableHead>
                  <TableHead className="font-semibold text-gray-600 text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockIssues.map((issue) => (
                  <TableRow key={issue.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{issue.title}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-600">{issue.category}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(issue.status)}`}>
                        {issue.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-gray-600">{issue.date}</td>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Issuemanagement;
