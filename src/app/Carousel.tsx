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
  const [rent, setRent] = React.useState(0)
  const [bed, setBed] = React.useState(0)
  const [bath, setBath] = React.useState(0)


  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
      setRent(api.selectedScrollSnap() + 1)
      setBed(api.selectedScrollSnap() + 1)
      setBath(api.selectedScrollSnap() + 1)

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
      <div className="py-2 text-center text-sm text-muted-foreground">
        House {current} of {count}
      </div>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Rent {rent}
      </div>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Bed {bed}
      </div>
    </div>
  )
}
