interface ServerRequestInput {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  inputBody: object;
}

const serverRequest = async (input: ServerRequestInput) => {
  const { endpoint, method, inputBody } = input;

  const response = await fetch(endpoint, {
    method,
    body: JSON.stringify(inputBody),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return response.json();
};

export default serverRequest;
