/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './Form.css';
import PropTypes from 'prop-types';

const INITIONAL_FORM_STATE = {
   date: '',
   distance: '',
};

export default function Form({ onAdd }) {
   const [form, setForm] = useState(INITIONAL_FORM_STATE);

   function formatData() {
      const valid = form.date.match(
         /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[.]([0]?[1-9]|[1][0-2])[.]([0-9]{4}|[0-9]{2})$/
      );
      if (!valid) {
         return false;
      }
      return true;
   }
   const onFieldChange = (e) => {
      const { target } = e;
      setForm((prev) => ({
         ...prev,
         [target.name]: target.value,
      }));
   };

   const onAddDistance = (e) => {
      e.preventDefault();
      const date = formatData();
      // eslint-disable-next-line no-restricted-globals
      if (!date || isNaN(form.distance) || form.distance === '') return;
      onAdd(form);
      setForm(INITIONAL_FORM_STATE);
   };

   return (
      <form className="Steps-form">
         <div className="Steps-Field">
            <label htmlFor="date" className="label">
               Дата (дд.мм.гг)
            </label>
            <input
               className="Steps-Control"
               id="date"
               name="date"
               value={form.date}
               onChange={onFieldChange}
            />
         </div>

         <div className="Steps-Field">
            <label htmlFor="distance" className="label">
               Пройдено км
            </label>
            <input
               className="Steps-Control"
               id="distance"
               name="distance"
               value={form.distance}
               onChange={onFieldChange}
            />
         </div>

         <button
            className="Form-button Form-Submit"
            type="submit"
            onClick={onAddDistance}
         >
            OK
         </button>
      </form>
   );
}

Form.propTypes = {
   onAdd: PropTypes.func.isRequired,
};
