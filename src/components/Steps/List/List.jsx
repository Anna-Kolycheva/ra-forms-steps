import React from 'react';
import './List.css';
import PropTypes from 'prop-types';

export default function List({ steps, onDelete }) {
   const data = steps.map((elem) => {
      const date = elem.date.split('.');
      const formdate = new Date(date[2], date[1] - 1, date[0]);
      return { ...elem, formdate };
   });

   const FormatedData = data.sort(
      (a, b) => b.formdate.getTime() - a.formdate.getTime()
   );

   const onDeleteLine = (id) => () => {
      onDelete(id);
   };

   return (
      <div className="Steps-List">
         <div className="Steps-ListHeader">
            <div className="Steps-ListHeaderItem">Дата</div>
            <div className="Steps-ListHeaderItem">Дистанция</div>
         </div>

         {FormatedData.map((step) => (
            <div className="Steps-ListItem" key={step.id}>
               <div className="Steps-ListItemDate">{step.date}</div>
               <div className="Steps-ListItemDictance">{step.distance}</div>
               <button
                  className="Form-button ListItem-delete"
                  type="submit"
                  onClick={onDeleteLine(step.id)}
               >
                  {' '}
                  X{' '}
               </button>
            </div>
         ))}
      </div>
   );
}

List.defaultProps = {
   steps: [],
};

List.propTypes = {
   steps: PropTypes.arrayOf(PropTypes.object),
   onDelete: PropTypes.func.isRequired,
};
