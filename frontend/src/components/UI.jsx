export const Card = ({ children, className }) => (
    <div className={`card ${className}`}>{children}</div>
  );
  
  export const CardContent = ({ children, className }) => (
    <div className={`card-content ${className}`}>{children}</div>
  );
  
  export const Button = ({ children, className, variant }) => (
    <button className={`button ${variant === 'outline' ? 'button-outline' : ''} ${className}`}>
      {children}
    </button>
  );
  
  export const Input = ({ className, ...props }) => (
    <input className={`input ${className}`} {...props} />
  );
  
  export const Table = ({ children }) => (
    <table className="w-full">{children}</table>
  );
  
  export const TableHeader = ({ children }) => (
    <thead>{children}</thead>
  );
  
  export const TableBody = ({ children }) => (
    <tbody>{children}</tbody>
  );
  
  export const TableHead = ({ children, className }) => (
    <th className={`table-head ${className}`}>{children}</th>
  );
  
  export const TableRow = ({ children, className }) => (
    <tr className={`table-row ${className}`}>{children}</tr>
  );
  export default {
    Card,
    CardContent,
    Button,
    Input,
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow
  };