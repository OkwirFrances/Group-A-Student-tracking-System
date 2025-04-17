import React from 'react';
import './Issuemanagement.css';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { Filter } from 'lucide-react';
import {
  Card,
  CardContent,
  Button,
  Input,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow
} from '../components/UI'; // Make sure this path matches your UI components file

const Issuemanagement = () => {
  const mockIssues = [
    { id: 1, title: "Course Registration Issue", category: "Registration", status: "Open", date: "2024-01-15" },
    { id: 2, title: "Missing Grades", category: "Academic", status: "In Progress", date: "2024-01-14" },
    { id: 3, title: "Signin Problem", category: "Technical", status: "Resolved", date: "2024-01-13" },
  ];

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'text-green-600 bg-green-100';
      case 'in progress':
        return 'text-yellow-600 bg-yellow-100';
      case 'resolved':
        return 'text-gray-600 bg-gray-100';
      default:
        return '';
    }
  };

  return (
    <div className="p-4">
      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Issues</h2>
            <div className="flex gap-4">
              <div className="search-bar">
                <Input
                  type="text"
                  placeholder="Search issues..."
                  className="pl-10"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <Button variant="outline" className="filter-btn">
                <Filter size={16} />
                Filter
              </Button>
              <Button className="new-issue-btn">
                <FiPlus />
                New Issue
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <td>{issue.title}</td>
                  <td>{issue.category}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full ${getStatusStyle(issue.status)}`}>
                      {issue.status}
                    </span>
                  </td>
                  <td>{issue.date}</td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Issuemanagement;