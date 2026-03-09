import { Link } from "react-router";
import ProductContainer from "../ProductContainer";

export default function HomePage() {
 
  return (
    <div>
      <Link to={"/products"}>Products</Link>

      <div>
        <h3>Featured Products</h3>
      </div>

       <ProductContainer keyword=""/>
    </div>
  );
}
