import { Navbar } from "./Components/Navbar";
import CartContainer from "./Components/CartContainer";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotals,getCartItems } from "./features/cart/cartSlice";
import Modal from "./Components/Modal";

function App() {
  const { cartItems,isLoading } = useSelector((store) => store.cart);
  const {isOpen}=useSelector((store)=>store.modal)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]); //dispatch warning sy bachny k leye likha hy

useEffect(()=>{
  dispatch(getCartItems())
},[])

if(isLoading){
  return(
  <h1 className="loading">Loading...</h1>
  )
}

  return (
    <main>
    {isOpen && <Modal/>}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
