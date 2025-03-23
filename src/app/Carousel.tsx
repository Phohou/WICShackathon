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

  const price = ["214900", "599000", "245000", "149000", "390000"]
  const sqrft = ["1658", "3196", "1594", "804", "2532"]
  const address = ["859 Sulphur St", "6531 Rosemary Ln", "10726 Nyla Spring St", "12654 Marble Dr", "421 Sidney St"]
  const zip = ["77034", "77016", "77016", "77070", "77003"]
  const city = ["Houston", "Houston", "Houston", "Houston", "Houston"]
  const state = ["TX", "TX", "TX", "TX", "TX"]
  const bed = ["3", "3", "3", "3", "3"]
  const bath = ["2", "2", "2", "2", "2"]
  const garages = ["2", "0", "2", "0", ]
  const photos = ["http://ap.rdcpix.com/dbcdcd0d9e257b08b90ceb404bc3176fl-m2852359842od-w480_h360_x2.webp?w=1080&q=75", "http://ap.rdcpix.com/28a5cdde02cebf79715e9c25f58113dcl-m2350283025od-w480_h360_x2.webp?w=1080&q=75", "http://ap.rdcpix.com/a3ff46be4f7eaaa6bc257dbe86d88d29l-b2554372464od-w480_h360_x2.webp?w=1080&q=75", "http://ap.rdcpix.com/f4c8d569ba318516a6f2ce8341e9a50bl-m632029116od-w480_h360_x2.webp?w=1080&q=75", "http://ap.rdcpix.com/814d19321eed9b3ce6b0a3ab9cab560el-m2329566958od-w480_h360_x2.webp?w=1080&q=75"]
  const links = ["https://www.realtor.com/realestateandhomes-detail/M8459919930", "https://www.realtor.com/realestateandhomes-detail/M8808333318", "https://www.realtor.com/realestateandhomes-detail/M9424891679", "https://www.realtor.com/realestateandhomes-detail/M8036424256", "https://www.realtor.com/realestateandhomes-detail/M7637031209"]



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
                    src={`${photos[index]}`}
                    alt={`No Image Available`}
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
        Price: {price[current-1]}
      </div>
      <div className="py-2 text-center text-sm text-muted-foreground justify-center">
      Address: {address[current-1]} {city[current-1]}, {state[current-1]} {zip[current-1]}
      </div>
      <div className="py-2 text-center text-sm text-muted-foreground justify-center">
        Bedroom/bedrooms: {bed[current-1]}
      </div>
      <div className="py-2 text-center text-sm text-muted-foreground justify-center">
        Bathrooms: {bath[current-1]}
      </div>  
      <div className="py-2 text-center text-sm text-muted-foreground justify-center">
        <a href={links[current-1]}>{links[current-1]}</a>
      </div>  
    </div>
  )
}
