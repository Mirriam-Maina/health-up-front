import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form, { connectForm } from '../../../utils/Forms';
import Input from '../../../utils/Forms/Input';
import T from '../../../utils/Translation';
import './HealthInformationForm.scss';
import Button from '../../Button';
import WithLoading from '../../WithLoading';

export const illnesses = {
  sugar: T.blood_sugar,
  bloodPressure: T.blood_pressure,
  bloodDiseases: T.blood_diseases,
  respiratory: T.respiratory_diseases,
  heartDiseases: T.heart_diseases,
};

export const allergies = {
  food: T.food,
  drugs: T.drugs,
  animals: T.animals,
  plants: T.plants,
  others: T.others_specify,
};

export const bloodGroups = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'].sort();

class HealthInformationForm extends Form {
  getProperties() {
    return {
      autoSave: true,
      mirror: true,
      autoSaveLoader: true,
      optionalFields: '*',
    };
  }

  readData(nextProps) {
    const { data: { profile } } = nextProps;
    if (profile) {
      return {
        ...profile.healthInformation,
      };
    }
  }

  createData() {
    const { values } = this.state;
    return {
      method: 'put',
      data: {
        healthInformation: {
          ...values,
        },
      },
    };
  }

  renderForm() {
    const { goNext, goBack, submitting } = this.props;
    const { values: { allergies: allergiesValue, operations } } = this.state;
    return (
      <div className="health-information-form">
        <div className="form">
          <div>
            <Input
              name="bloodType"
              type="select"
              label={T.blood_type}
              placeholder={T.blood_type}
              options={
                bloodGroups.map(group => ({
                  value: group, name: group,
                }))
              }
            />
            <Input name="smoker" type="radio-group" label={T.are_you_a_smoker} options={{ yes: T.yes, no: T.no }} />
            <Input name="drugsUsed" type="textarea" label={T.drugs_used} />
            <Input name="operations" type="radio-group" label={T.have_you_had_operations} options={{ yes: T.yes, no: T.no }} />
            {
              operations === 'yes' && (
                <Input name="operationsHad" type="textarea" />
              )
            }
          </div>
          <div>
            <Input
              name="familyHistory"
              type="checkbox-group"
              showInput={{
                bloodDiseases: 'bloodDiseasesInfo',
                respiratory: 'respiratoryInfo',
                heartDiseases: 'heartDiseasesInfo',
              }}
              label={T.family_history}
              options={illnesses} />
            <Input
              name="currentIllness"
              showInput={{
                bloodDiseases: 'bloodDiseasesInfo',
                respiratory: 'respiratoryInfo',
                heartDiseases: 'heartDiseasesInfo',
              }}
              type="checkbox-group"
              label={T.current_illnesses}
              options={illnesses} />
            <Input
              name="allergies"
              showInput={{
                food: 'foodInfo',
                drugs: 'drugsInfo',
                animals: 'animalsInfo',
                plants: 'plantsInfo',
                others: 'otherAllergies',
              }}
              type="checkbox-group"
              label={T.are_you_allergic_to}
              options={allergies} />
          </div>
        </div>
        <div className="button-group">
          <Button onClick={goBack} disabled={submitting}>{T.previous}</Button>
          {/* <Button onClick={goNext} disabled={submitting}>{T.next}</Button> */}
        </div>
      </div>
    );
  }
}

HealthInformationForm.propTypes = {};

HealthInformationForm.defaultProps = {};

export default connectForm(WithLoading(HealthInformationForm))('userProfile');
