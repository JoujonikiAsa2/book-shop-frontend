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

export function ProductCard({product}:any) {
  return (
    <Card className="h-[400px] w-[98%] rounded-none">
      <CardHeader>
        <CardTitle className="flex justify-center"><img src={product?.imgUrl} alt="" className="w-full h-48 object-cover"/></CardTitle>
        <CardDescription>{product?.name}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        <p>Author: {product?.author}</p>
        <p>Category: {product?.category}</p>
        <p>Price: {product?.price} Taka</p>
      </CardContent>
      <CardFooter className="flex justify-between">
       <Link to={`/product-details/${product._id}`}><Button>View Details</Button></Link>
      </CardFooter>
    </Card>
  )
}
