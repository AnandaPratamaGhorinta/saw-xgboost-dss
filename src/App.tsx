interface User {
  name: string;
  age?: string;
}

function App() {
  const users: User[] = [];

  return (
    <>
      <table border={100}>
        <tr>
          <th>Company</th>
          <th>Contact</th>
          <th>Country</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
        </tr>
      </table>

      <form>
        <p>
          name : <input type="text" id="name" />
        </p>
        <p>
          age :<input type="text" id="age" />
        </p>
      </form>
      <p>
        To understand the example better, we have added borders to the table.
      </p>
    </>
  );
}

export default App;
