import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import type { Nonprofit } from '../../../utilities/api/types';
import { getFiscalSponsor } from '../../../utilities/api';
import { tabletScreens } from '../../../utilities/general/responsive';

interface Props {
  nonprofitId: number;
}

const FiscalSponsor = ({ nonprofitId }: Props) => {
  const { t } = useTranslation();

  const [fiscalSponsor, setFiscalSponsor] = useState<Nonprofit | null>(null);

  const fetchData = async () => {
    const fiscalSponsor = await getFiscalSponsor(nonprofitId);
    setFiscalSponsor(fiscalSponsor.data);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!fiscalSponsor) {
    return null;
  }

  return (
    <FiscalSponsorContainer>
      <FiscalSponsorImage
        src={fiscalSponsor.logo_image_url}
      ></FiscalSponsorImage>
      <FiscalSponsorDivider></FiscalSponsorDivider>
      <FiscalSponsorText>
        {t('gamHome.listItem.fiscalSponsor', {
          sponsorName: fiscalSponsor.name,
        })}
      </FiscalSponsorText>
    </FiscalSponsorContainer>
  );
};

const FiscalSponsorContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 55px;
  position: relative;

  @media (${tabletScreens}) {
    justify-content: flex-start;
    margin: 0 24px 30px 24px;
  }
`;

const FiscalSponsorImage = styled.img`
  max-height: 35px;
  max-width: 80px;

  @media (${tabletScreens}) {
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    margin-left: 0%;
  }
`;

const FiscalSponsorDivider = styled.div`
  margin-left: 18px;
  width: 5px;
  height: 37px;
  background-color: #f5ec57;

  @media (${tabletScreens}) {
    height: 110px;
    margin-left: 27%;
  }
`;

const FiscalSponsorText = styled.div`
  display: flex;
  align-items: center;
  margin-left: 6px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 18px;
  color: #1e1e1e;
  max-width: 760px;
`;

export default FiscalSponsor;
