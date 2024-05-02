import React, { useRef, useState, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    let dispatch = useDispatchCart()
    let data = useCart()
    const priceRef = useRef()
    let options = props.option;
    let priceoptions = Object.keys(options);
    const [qty, setqty] = useState(1);
    const [size, setsize] = useState("")
    // let fooditem = props.fooditems ;
    const handleaddtocart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.fooditem._id) {
                food = item;

                break;
            }
        }
        if (food.length !== 0) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.fooditem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.fooditem._id, name: props.fooditem.name, price: finalPrice, qty: qty, size: size, img: props.img })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }

        await dispatch({ type: "ADD", id: props.fooditem._id, name: props.fooditem.name, price: finalPrice, qty: qty, size: size, img:props.img })


    }
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setsize(priceRef.current.value)

    }, [])


    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.fooditem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.fooditem.name}</h5>

                        <div className='container w-100'>
                            <select className="m-2 h-100  bg-success rounded" onChange={(e) => setqty(e.target.value)} id="">
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className="m-2 h-100  bg-success rounded" ref={priceRef} onChange={(e) => setsize(e.target.value)} id="">
                                {priceoptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>

                            <div className='d-inline  fs-5'>
                                {finalPrice}/-
                            </div>
                        </div>
                        <hr />
                        <button className='btn btn-success justify-center ms-2' onClick={handleaddtocart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
