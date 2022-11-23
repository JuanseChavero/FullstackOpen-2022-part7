import { useField } from '../hooks';
import { useNavigate } from 'react-router-dom';

const CreateNew = ({ addNew }) => {
  const [content, resetContent] = useField('text');
  const [author, resetAuthor] = useField('text');
  const [info, resetInfo] = useField('text');
  const navigate = useNavigate();

  // Function to reset the field values
  const resetFields = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  const handleSubmit = (e) => {
    // Prevent default browser behavior
    e.preventDefault();

    const newAnecdote = {
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
      id: Number((Math.random() * 10000).toFixed(0)),
    };

    // Add the new anecdote
    addNew(newAnecdote);

    // Navigate to Home page to see the new anecdote
    navigate('/');
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content:
          <input {...content} />
        </div>
        <div>
          Author:
          <input {...author} />
        </div>
        <div>
          Url for more info:
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={resetFields}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
