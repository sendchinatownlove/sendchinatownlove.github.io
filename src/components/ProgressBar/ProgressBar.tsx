import * as React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, Theme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { useModalPaymentState } from '../../utilities/hooks/ModalPaymentContext/context';

const SupporterTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#ffffff',
    color: 'rgba(0, 0, 0, 0.87)',
    width: 180,
    fontSize: theme.typography.pxToRem(14),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const ProgressBar = () => {
    const { sellerData } = useModalPaymentState();
    const {
      amount_raised,
      target_amount,
      progress_bar_color,
      num_contributions,
      num_donations,
      num_gift_cards,
      donation_amount,
      gift_card_amount,
    } = sellerData;

    const progressWidth = (raised: number, target: number) => {
      if (raised < target) return (raised / target) * 100;
      return 100;
    };

    return (
      <ProgressBarContainer>
        <TargetAmountBar className="progress-bar">
          <CurrentProgressBar
            style={{
              width: `${progressWidth(amount_raised, target_amount)}%`,
              backgroundColor: progress_bar_color,
              //defaults to default color if no color is passed in
            }}
          >
            {' '}
          </CurrentProgressBar>
        </TargetAmountBar>
        <ContributionInfoContainer>
          <div>
            ${(Math.floor(amount_raised) / 100).toLocaleString()} of $
            {(Math.floor(target_amount) / 100).toLocaleString()}
          </div>
          <div>
            <SupporterTooltip
              title={
                <React.Fragment>
                  <ToolTipTable>
                    <tbody>
                      <tr>
                        <td>
                          <b>{num_gift_cards}</b> vouchers
                        </td>
                        <td>
                          <b>${Math.floor(gift_card_amount) / 100}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>{num_donations}</b> donations
                        </td>
                        <td>
                          <b>${Math.floor(donation_amount) / 100}</b>
                        </td>
                      </tr>
                    </tbody>
                  </ToolTipTable>
                </React.Fragment>
              }
              enterTouchDelay={50}
              placement="top"
            >
              <div>
                <b>{num_contributions}</b> supporters
              </div>
            </SupporterTooltip>
          </div>
        </ContributionInfoContainer>
      </ProgressBarContainer>
    );
  };

export default ProgressBar;

const ProgressBarContainer = styled.div`
  width: 100%;
  padding: 15px 0;
`;

const TargetAmountBar = styled.div`
  background-color: #dedede;
  height: 12px;
  margin-bottom: 15px;
`;

const CurrentProgressBar = styled.div`
  background-color: #dd678a;
  z-index: 5;
  height: 12px;
`;

const ContributionInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ToolTipTable = styled.table`
  width: 100%;
`;
