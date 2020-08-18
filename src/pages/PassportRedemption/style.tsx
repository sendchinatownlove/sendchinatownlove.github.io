import styled from 'styled-components';
import CrawlMap from './CrawlMap.png';

const Container = styled.div`
    background-color: #e5e5e5;
    height: 100%;
    min-height: 100vh;
    background-image: url(${CrawlMap});

    @media (max-width: 475px) {
        background-size: 500px;
    }
`;

const PassportContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 380px;
    margin: 0 auto;
    padding: 10px;
    box-sizing: border-box;

    &.faq {
        font-size: 12px;
        max-height: 100vh;
    }
`;

const ExternalLink = styled.a`
    font-weight: bold;
    text-transform: uppercase;
    color: black;
    font-size: 12px;
    margin: 20px;
    letter-spacing: .15em;

    &.faq {
        @media (max-width: 365px) {
            margin-left: 8px;
            margin-right: 8px;
    }
`;

export { Container, PassportContainer, ExternalLink };