import wait from './wait';

interface ServerRequestInput {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  inputBody: object;
}

const serverRequest = async (input: ServerRequestInput) => {
  const { endpoint, method, inputBody } = input;

  try {
    const response = await fetch(endpoint, {
      method,
      body: JSON.stringify(inputBody),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (response.status >= 400 && response.status < 600) {
      throw new Error('Bad response from server');
    }

    if (response.ok) {
      return response.json();
    }
    setTimeout(function () {
      throw new Error(response.statusText);
    }, 2000);
  } catch (error) {
    await wait(2000);
    console.error(error);
    return false;
  }
};

export default serverRequest;
