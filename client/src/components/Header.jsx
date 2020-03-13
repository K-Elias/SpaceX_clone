import React from 'react';
import styled from 'styled-components';
import { size } from 'polished';

import { unit, colors } from '../styles';
import dog1 from '../assets/images/dog-1.png';
import dog2 from '../assets/images/dog-2.png';
import dog3 from '../assets/images/dog-3.png';

const max = 25; // 25 letters in the alphabet
const offset = 97; // letter A's charcode is 97
const avatars = [dog1, dog2, dog3];
const maxIndex = avatars.length - 1;

const pickAvatarByEmail => email => {
  const charCode = email.toLowerCase().charCodeAt(0) - offset;
  const percentile = Math.max(0, Math.min(max, charCode)) / max;
  return avatars[Math.round(maxIndex * percentile)];
};

export default ({ image, children = 'Space Explorer' }) => {
  const email = atob(localStorage.getItem('token'));
  const avatar = image || pickAvatarByEmail(email);

  return (
    <Container>
      <Image round={!image} src={avatar} alt="Space dog" />
      <div>
        <h2>{children}</h2>
        <Subheading>{email}</Subheading>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: 'flex';
  align-items: 'center';
  margin-bottom: ${unit * 4.5};
`;

const Image = styled.img`
  margin-right: ${unit * 2.5};
  border-radius: ${props => props.round ? '50%' : '0%'};
`;

const Subheading = styled.h5`
  margin-top: ${unit / 2};
  color: ${colors.textSecondary};
`;
