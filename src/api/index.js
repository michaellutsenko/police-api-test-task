// Normally, within the API folder I create certain helper functions
// They can be general purpose wrappers around fetch() or something
// like this, where each function corresponds to request type.
// In this task, we'll only have GET requests, so I just make a general
// GET-function

export const get = async (uri) => {
  try {
    const fetchResponse = await fetch(uri, { method: 'get' });
    if (fetchResponse.ok) {
      return fetchResponse.json();
    } else {
      throw new Error(
        `An error has occurred while accessing ${uri}: ${fetchResponse.status} ${fetchResponse.statusText}`
      );
    }
  } catch (err) {
    // For now let's just write it down in the console
    console.error(err);
  }
};
