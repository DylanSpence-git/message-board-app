const Message =({msgNum, name, msgText})=>(
    <tr>
        <td>{ msgNum }</td>
        <td>{ name }</td>
        <td>{ msgText }</td>
    </tr>
);
export default Message;