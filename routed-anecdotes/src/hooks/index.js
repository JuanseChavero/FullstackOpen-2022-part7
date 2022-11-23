import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return [
    {
      type,
      value,
      onChange,
    },
    reset,
  ];
};

export const useVote = (anecdote) => {
  const [votes, setVotes] = useState(anecdote.votes);

  const vote = () => {
    setVotes(votes + 1);
  };

  return {
    votes,
    vote,
  };
};

export const useNotification = (message, setMessage) => {
  const [messageText, setMessageText] = useState(message);

  const setNotification = (message) => {
    setMessageText(message);
    setTimeout(() => {
      setMessageText('');
    }, 10000);
  };

  return {
    messageText,
    setNotification,
  };
};
