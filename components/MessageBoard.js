import Table from 'react-bootstrap/Table';
import Message from '../components/Message';

const MessageBoard =({messages})=>{
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Message</th>
                </tr>
            </thead>
            <tbody>
                {messages.map((message, index) => 
                        <Message key={message.id} {...message} msgNum={index+1} />
                    )}
            </tbody>
        </Table>
    );
};

export default MessageBoard;