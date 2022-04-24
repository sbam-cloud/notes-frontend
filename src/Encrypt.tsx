import { useFormik } from "formik";
import { useState } from "react";

export default function Encrypt() {
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values, helpers) => {
      console.log(import.meta.env.VITE_API_ENDPOINT!);
      const encryptUrl = new URL('encrypt', import.meta.env.VITE_API_ENDPOINT!).toString();
      const response = await fetch(encryptUrl, {
        method: 'POST',
        body: JSON.stringify(values),
      });
      const data = await response.json();
      setGeneratedUrl(`${window.location.origin}/decrypt/${data.id}#${data.secret}`);
    }
  })
  return (
    <div className="App">
      {generatedUrl === null ? (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor='message'>Message</label>
          <textarea
            id='message'
            name='message'
            onChange={formik.handleChange}
            value={formik.values.message}
          />
          <button type='submit'>Submit</button>
        </form>
      ) : (
        <div>
          <label htmlFor='generatedUrl'>Generated Link</label>
          <input
            id='generatedUrl'
            name='generatedUrl'
            readOnly
            value={generatedUrl}
          />
        </div>
      )}
    </div>
  )
}
