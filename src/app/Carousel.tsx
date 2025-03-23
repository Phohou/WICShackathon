import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

export default function CarouselDApiDemo() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const [income, setIncome] = React.useState(0)
  const rent = ["1000", "2000", "3000", "4000", "5000"]
  const bed = ["1", "2", "3", "4", "5"]
  const bath = ["1", "2", "3", "4", "5"]



  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)

    })
  }, [api])

  return (
    <div className="mx-auto max-w-xs">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{        
                    <img
                    src={'/test.jpg'}
                    alt={`Slide ${index + 1} Image`}
                    className="w-full h-full object-cover rounded-lg"
                  />}
                 </span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground justify-center">
        House {current} of {count}
      </div>
      <div className="py-2 text-center text-sm text-muted-foreground justify-center">
        Rent: {rent[current-1]}
      </div>
      <div className="py-2 text-center text-sm text-muted-foreground justify-center">
        Bedroom/bedrooms: {bed[current-1]}
      </div>
      <div className="py-2 text-center text-sm text-muted-foreground justify-center">
        Bathrooms: {bath[current-1]}
      </div>  
    </div>
  )
}
