import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Trans, useTranslation } from 'react-i18next';

import { getProject, light_up_chinatown_id } from '../../utilities/api';
// hmmm seems to link to fetchData below, but unclear how backend works

const LiveMetrics = () => {
  //const { t } = useTranslation();

  /*
  const fetchData = async (project_id: number) => {
    const { data } = await getProject(project_id);
    if (data) {
      // useState here to set the numbers to what we need
    }
  };
  

  useEffect(() => {
    fetchData(light_up_chinatown_id);
  }, []);
  */

  console.log('livemetrics component');
  return (
    <React.Fragment>
      <div> Matt test </div>
    </React.Fragment>
  );
};

// probably some style elements here.

export default LiveMetrics;
