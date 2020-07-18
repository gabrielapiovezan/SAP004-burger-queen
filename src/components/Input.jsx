import React from "react"
// import "./input.css";

export default (props) => {
  // const stats = {
  //   backgroundColor: props.color,
  //   borderColor: props.color,
  // };
  // <input type={props.type} placeholder={props.placeholder} />

  <button className="square" onClick={() => alert('click')}>
    {props.value}
  </button>

}


// class ShoppingList extends React.Component {
//   render() {
//     return (
//       <div className="shopping-list">
//         <h1>Lista de compras para {this.props.name}</h1>
//         <ul>
//           <li>Instagram</li>
//           <li>WhatsApp</li>
//           <li>Oculus</li>
//         </ul>
//       </div>
//     );
//   }
// }

// export default ShoppingList
