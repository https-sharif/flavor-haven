import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import menuList from '../../menu/menuList';

const popularDishesID = [ '1', '6', '8', '5', '9'];

export function PopularDishes() {
 const containerRef = useRef<HTMLDivElement>(null);

  const dishes = menuList.filter((dish) => popularDishesID.includes(dish.id))

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Popular <span className="text-primary">Dishes</span>
        </h2>
        
        <div 
          ref={containerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {dishes.map((dish) => (
            <motion.div
              key={dish.id}
              className="flex-shrink-0 w-[300px] snap-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Card variant="hover" className="h-[400px]">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardHeader>
                  <CardTitle>{dish.name}</CardTitle>
                  <p className="text-gray-600 text-sm">{dish.description}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">
                    ৳{dish.price}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}