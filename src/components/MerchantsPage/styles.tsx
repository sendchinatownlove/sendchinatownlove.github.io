import styled from 'styled-components';
import { phoneScreens } from '../../utilities/general/responsive';

const MerchantCard = styled.div`
    height: 475px;
    width: 350px;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
    margin: 30px 60px 30px 0;
    padding: 25px;
    font-size: 14px;
    background-color: white;

    &.descriptionBox {
        width: 430px;
        height: 475px;
        text-align: center;
    }

    @media (${phoneScreens}) {
        margin: 30px;
        width: 85vw;

        &.descriptionBox {
            width: 85vw;
            height: auto;
    }
`;

export { MerchantCard };
