"""defining a function for sending emails to lecturers when an issue hs been assigned"""
def send_email_to_lecturer(lecturer_email,student_name,issue_id):
   subject = "New Issue Assigned"
   body = f"""
   Dear Lecturer,
   You have been assigned a new issue with ID: {issue_id}.
   Issue details:
   student_name: {student_name}
   Best regards,
   Your Team"""

   