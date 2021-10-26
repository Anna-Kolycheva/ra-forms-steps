import React, { useState } from 'react';
import { v4 } from 'uuid';
import Form from './Form/Form';
import List from './List/List';
import './Steps.css';

export default function Steps() {
   const [steps, setSteps] = useState([]);

   const onAddDistance = (distance) => {
      const dateIndex = steps.findIndex((el) => el.date === distance.date);
      if (dateIndex !== -1) {
         steps[dateIndex].distance =
            Number(steps[dateIndex].distance) + Number(distance.distance);
         setSteps((prev) => prev.map((step) => step));
         return;
      }
      setSteps((prev) => [
         ...prev,
         {
            ...distance,
            id: v4(),
         },
      ]);
   };

   const onDelete = (id) => {
      setSteps(() => steps.filter((el) => el.id !== id));
   };

   return (
      <div className="Steps">
         <Form onAdd={onAddDistance} />
         <List steps={steps} onDelete={onDelete} />
      </div>
   );
}
