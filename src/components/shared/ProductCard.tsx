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

export function ProductCard({product}:any) {
  return (
    <Card className="h-[340px] w-[98%] rounded-none">
      <CardHeader>
        <CardTitle className="flex justify-center"><img src={product.imgUrl} alt="" className="size-32"/></CardTitle>
        <CardDescription>{product.name}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        <p>Author: {product.author}</p>
        <p>Category: {product.category}</p>
        <p>Price: {product.price}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant={"outline"} size={"sm"}>View Details</Button>
      </CardFooter>
    </Card>
  )
}
