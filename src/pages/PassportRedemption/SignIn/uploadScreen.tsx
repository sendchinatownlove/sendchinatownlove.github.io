import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { SubTitle } from '../style';
import { InputContainer, Label, Column, InputField } from './index';
import { Button } from './emailScreen';
import {
  getUploadUrl,
  sendImage,
  getContactInfo,
  getAllParticipatingSellers,
} from '../../../utilities/api/interactionManager';
import uploadImageIcon from '../Assets/uploadImage.png';

const UploadScreen = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const [email, setEmail] = useState('');

  useEffect(() => {
    if (id) {
      getContactInfo(id)
        .then((contactInfo) => {
          // FIGURE OUT IF THIS IS CORRECT STRUCTURE & IF WERE DOING IT LIKE THIS?
          setEmail(contactInfo.data.email);
        })
        .catch((err) => {
          console.log('passport error: ' + err);
        });
    }
  }, [id]);

  const [businessName, setBusinessName] = useState('');

  const [array, setArray] = useState<any>([]);
  const [selected, setSelectedMerchant] = useState(true);

  // TODO: UPDATE THIS WITH DATA FROM AN ACTUAL AJAX CALL!
  const [searchBar, setSearchBar] = useState<any>([]);

  useEffect(() => {
    const getAllSellers = async () => {
      const { data: allSellers } = await getAllParticipatingSellers();
      setSearchBar(allSellers);
    };
    getAllSellers();
  }, []);

  useEffect(() => {
    const debouncer = setTimeout(() => {
      if (searchBar[0]?.name) {
        let match = searchBar
          .filter((merchant) =>
            merchant?.name
              .toLowerCase()
              .includes(businessName.toLowerCase().trim())
          )
          .slice(0, 5);
        setArray(match);
      }
    }, 200);

    return () => clearTimeout(debouncer);
  }, [businessName, searchBar]);

  const [billTotal, setBillTotal] = useState('');

  const [receiptFilePath, setReceiptFilePath] = useState('');
  const [receipt, setReceipt] = useState<File | null>(null);

  const uploadImage = async (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      setReceiptFilePath(URL.createObjectURL(event.target.files[0]));
      setReceipt(event.target.files[0]);
    }
  };

  const submitReceipt = async () => {
    let filename;

    if (receipt === null) return false;

    try {
      const ext = receipt.type.split('/')[1];
      // filename = `${email.split('@')[0]}-${new Date()
      //   .toISOString()
      //   .replace(/(:|\.)/g, '-')}.${ext}`;

      filename = `hello-${new Date()
        .toISOString()
        .replace(/(:|\.)/g, '-')}.${ext}`;

      const signedUrl = unescape(
        (await getUploadUrl(filename, receipt.type)).data.url
      );

      // TODO: UPDATE THIS ENDPOINT WITH ALL RECEIPT PARAMS
      // save filename and send with final request to be saved in DB
      await sendImage(signedUrl, filename, receipt);
    } catch (err) {
      console.log(err);
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
        <CustomSymbolContainer className="searchBar">
          <InputField
            name="crawl-merchant-name"
            type="text"
            onChange={(e) => {
              e.preventDefault();
              setBusinessName(e.target.value);
              setSelectedMerchant(false);
            }}
            value={businessName}
            placeholder="Search Chinatown Businesses"
          />
        </CustomSymbolContainer>

        {!!businessName && !selected ? (
          !!array.length ? (
            <SearchContainer>
              {array.map((merchant) => (
                <SearchResult
                  key={merchant.name + 'lny-crawl'}
                  onClick={(e) => {
                    e.preventDefault();
                    setBusinessName(merchant.name);
                    setSelectedMerchant(true);
                  }}
                >
                  {merchant.name}
                </SearchResult>
              ))}
            </SearchContainer>
          ) : (
            <SearchContainer className="addPadding">
              Sorry, this name doesn’t correspond with one of our participating
              merchants. Please try searching again.
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
            }}
            value={billTotal}
            min="0"
            step=".01"
          />
        </CustomSymbolContainer>

        <ButtonTest>
          {!receipt ? (
            <>
              <img src={uploadImageIcon} alt="upload-receipt-arrow-img" />
              <p />
              <span>Tap to upload a picture of your receipt</span>
            </>
          ) : (
            <>
              <SelectedImage
                src={receiptFilePath}
                alt="upload-receipt-arrow-img"
              />
              <ReplaceButton>Tap to replace</ReplaceButton>
            </>
          )}
          <input
            type="file"
            id="imageFile"
            capture="environment"
            accept="image/*"
            onChange={(e) => uploadImage(e)}
          />
        </ButtonTest>
      </Column>

      <InputContainer className="bottom">
        <Button
          primary={true}
          disabled={!businessName && !receipt && !billTotal}
          onClick={(e) => {
            e.preventDefault();
            submitReceipt();
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
  // height: 115px;
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

  &.searchBar {
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
