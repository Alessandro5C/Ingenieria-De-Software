import React from 'react';
import CustomMainForm from '../form/custom-main-form';
import PaymentForm from '../form/payment-form';
import CustomBodyDescription from './custom-body-description';
import CustomBodyName from './custom-body-name';
import CustomBody from './custom-body';

function BodyCustomized() {
    return (
        <React.Fragment>
            <CustomBodyName>Hola Mundo</CustomBodyName>

            <CustomBodyDescription>Manda un Hola mundo</CustomBodyDescription>

            <CustomBody>
                <CustomMainForm title={'Titulo del Formulario'}>
                    {/*<AddressForm />*/}
                    <PaymentForm />
                    {/* <Review />*/}
                </CustomMainForm>
            </CustomBody>
        </React.Fragment>
    );
}

export default BodyCustomized;
