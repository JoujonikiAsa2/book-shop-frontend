/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"
import '../../styles/animation.css';

export function ProductCard({product}:any) {
  return (
    <Card className="h-[400px] w-[98%] rounded-none card-animation">
      <CardHeader>
        <CardTitle className="flex justify-center"><img src={product?.imgUrl} alt="" className="w-full h-48 object-cover"/></CardTitle>
        <CardDescription className="text-[#E07A5F]">{product?.name?.slice(0, 20)}...</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        <p><span className="poppins-regular uppercase text-gray-500">Author:</span> &nbsp; <span className="uppercase text-gray-500"> {product?.author}</span></p>
        <p><span className="poppins-regular uppercase text-gray-500">Category:</span> &nbsp; <span className="uppercase text-gray-500" >{product?.category}</span></p>
        <p><span className="poppins-regular uppercase text-gray-500">Price:</span> &nbsp; <span className="uppercase text-gray-500" >&#2547;{product?.price}</span> </p>
      </CardContent>
      <CardFooter className="flex justify-between">
       <Link to={`/product-details/${product._id}`}><Button className="bg-[#E07A5F] text-white hover:bg-[#E07A5F]/80" size={"sm"}>View Details</Button></Link>
      </CardFooter>
    </Card>
  )
}
