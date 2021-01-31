import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { SubTitle } from '../style';
import { InputContainer, Label, Column, InputField } from './index';
import { Button } from './emailScreen';
import {
  getUploadUrl,
  sendImage,
  getAllParticipatingSellers,
  uploadCrawlReceipts,
} from '../../../utilities/api/interactionManager';
import uploadImageIcon from '../Assets/uploadImage.png';

const UploadScreen = () => {
  const { push } = useHistory();
  const { t } = useTranslation();
  const { id } = useParams();

  // all sellers part of the lny crawl - retrieved on initial load of the page
  const [allParticipatingSellers, setallParticipatingSellers] = useState<any>(
    []
  );

  // seller name + id
  const [participatingSeller, setParticipatingSeller] = useState('');
  const [participatingSellerId, setParticipatingSellerId] = useState<number>(
    -1
  );

  // search values + did user select a valid merchant?
  const [sellersSearchBar, setSellersSearchBar] = useState<any>([]);
  const [isSearchingSellers, setIsSearchingSellers] = useState(true);

  // receipt total
  const [billTotal, setBillTotal] = useState('');

  // string value of receipt + actual receipt (file format)
  const [receiptFilePath, setReceiptFilePath] = useState('');
  const [receipt, setReceipt] = useState<File | null>(null);

  // disables buttons while loading info from the backend
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllSellers = async () => {
      const { data: allSellers } = await getAllParticipatingSellers();
      setallParticipatingSellers(allSellers);
    };
    getAllSellers();
  }, []);

  useEffect(() => {
    const debouncer = setTimeout(() => {
      if (allParticipatingSellers[0]?.name) {
        let match = allParticipatingSellers
          .filter((merchant) =>
            merchant?.name
              .toLowerCase()
              .includes(participatingSeller.toLowerCase().trim())
          )
          .slice(0, 5);
        setSellersSearchBar(match);
      }
    }, 200);
    return () => clearTimeout(debouncer);
  }, [participatingSeller, allParticipatingSellers]);

  const alphanumericRegex = (str) => {
    return str.replace(/[^a-zA-Z0-9]/g, '-');
  };

  const uploadImage = async (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      setReceiptFilePath(URL.createObjectURL(event.target.files[0]));
      setReceipt(event.target.files[0]);
    }
  };

  const submitReceipt = async () => {
    if (receipt === null) return false;

    try {
      const ext = receipt.type.split('/')[1];

      let filename = `${id}-${alphanumericRegex(
        participatingSeller
      )}-${alphanumericRegex(new Date().toISOString())}.${ext}`;

      // upload receipt to gc
      const signedUrl = unescape(
        (await getUploadUrl(filename, receipt.type)).data.url
      );
      await sendImage(signedUrl, filename, receipt);

      // upload info + receipt to db
      let data = await uploadCrawlReceipts(
        participatingSellerId,
        id,
        Number(billTotal) * 100,
        filename
      );

      if (data) push(`/lny-passport/${id}/tickets`);
    } catch (err) {
      console.log(err);
      setParticipatingSeller('');
      setBillTotal('');
      setReceiptFilePath('');
    }
  };

  return (
    <>
      <Column>
        <SubTitle>{t('passport.labels.showReceipt')}</SubTitle>
        <Column />
        <Label htmlFor="crawl-merchant-name">
          {t('passport.labels.crawlMerchant')}
        </Label>
        <CustomSymbolContainer className="allParticipatingSellers">
          <InputField
            name="crawl-merchant-name"
            type="text"
            onChange={(e) => {
              e.preventDefault();
              setParticipatingSeller(e.target.value);
              setIsSearchingSellers(true);
              setIsLoading(false);
            }}
            onBlur={() => setIsSearchingSellers(false)}
            value={participatingSeller}
            placeholder="Search Chinatown Businesses"
          />
        </CustomSymbolContainer>

        {!!participatingSeller && isSearchingSellers ? (
          !!sellersSearchBar.length ? (
            <SearchContainer>
              {sellersSearchBar.map((merchant) => (
                <SearchResult
                  key={merchant.name + 'lny-crawl'}
                  onClick={(e) => {
                    e.preventDefault();
                    setParticipatingSeller(merchant.name);
                    setIsSearchingSellers(false);
                    setParticipatingSellerId(merchant.id);
                    setIsLoading(false);
                  }}
                >
                  {merchant.name}
                </SearchResult>
              ))}
            </SearchContainer>
          ) : (
            <SearchContainer className="addPadding">
              {t('passport.errors.validParticipatingSeller')}
            </SearchContainer>
          )
        ) : null}

        <Label htmlFor="bill-total">{t('passport.labels.billTotal')}</Label>
        <CustomSymbolContainer className="billTotal">
          <InputField
            name="bill-total"
            className="indent"
            type="number"
            onChange={(e) => {
              e.preventDefault();
              setBillTotal(e.target.value);
              setIsLoading(false);
            }}
            value={billTotal}
            min="10"
            max="2000"
            step=".01"
          />
          <SubTitle color="grey" spacing="none">
            $10 minimum
          </SubTitle>
        </CustomSymbolContainer>

        <ButtonTest>
          {!receipt ? (
            <>
              <img src={uploadImageIcon} alt="upload-receipt-arrow-img" />
              <p />
              <span>{t('passport.labels.uploadReceipt')}</span>
            </>
          ) : (
            <>
              <SelectedImage
                src={receiptFilePath}
                alt="upload-receipt-arrow-img"
              />
              <ReplaceButton>
                {t('passport.labels.reuploadReceipt')}
              </ReplaceButton>
            </>
          )}
          <input
            type="file"
            id="imageFile"
            capture="environment"
            accept="image/*"
            onChange={uploadImage}
          />
        </ButtonTest>
      </Column>

      <InputContainer className="bottom">
        <Button
          primary={true}
          disabled={
            !allParticipatingSellers.find(
              (seller) => seller.name === participatingSeller
            ) ||
            !receipt ||
            Number(billTotal) < 10 ||
            Number(billTotal) > 2000 ||
            isLoading
          }
          onClick={(e) => {
            e.preventDefault();
            submitReceipt();
            setIsLoading(true);
          }}
        >
          Add Receipt
        </Button>
      </InputContainer>
    </>
  );
};

export default UploadScreen;

const SearchContainer = styled.div`
  border-radius: 5px;
  border: 1px solid #808080;
  padding: 5px;
  font-size: 14px;

  &.addPadding {
    padding: 10px 15px;
  }
`;

const SearchResult = styled.div`
  padding: 5px 15px;
  cursor: pointer;

  :hover {
    background-color: #f9eff0;
  }
`;

const SelectedImage = styled.img`
  width: 100%;
`;

const ReplaceButton = styled.span`
  background-color: #dd678a;
  color: white;
  border-radius: 5px;
  padding: 7.5px 15px;
  position: absolute;
  right: 2%;
  bottom: 10%;
`;

const CustomSymbolContainer = styled.div`
  position: relative;
  display: inline;
  font-size: 16px;
  color: #808080;

  &.billTotal {
    :before {
      content: '$';
      position: absolute;
      top: 18px;
      bottom: 18px;
      left: 10px;
      z-index: 1;
      margin-right: 15px;
    }
  }

  &.allParticipatingSellers {
    :before {
      content: '\f002';
      font-family: FontAwesome;
      position: absolute;
      top: 20px;
      bottom: 20px;
      right: 15px;
      z-index: 1;
    }
  }
`;

const ButtonTest = styled.button`
  border: 1px solid #dd678a;
  border-radius: 5px;
  background-color: rgba(221, 103, 138, 0.2);
  color: #dd678a;
  font-size: 14px;
  font-weight: bold;
  position: relative;
  margin: 25px 0 15px;
  outline: none;
  height: 130px;
  overflow: hidden;

  input[type='file'] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
`;
