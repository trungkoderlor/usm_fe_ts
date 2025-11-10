import React from 'react';
import { VariantProps } from 'tailwind-variants';
import { ButtonCommon, button } from '../Button';
import { Link } from 'react-router-dom';
interface HomeItemProps {
  title: string;
  shortDescription: string;
  ButtonText: string;
  ButtonColor?: VariantProps<typeof button>['color'];
  url: string;
}

const HomeItem: React.FC<HomeItemProps> = ({ title, shortDescription, ButtonText, url, ButtonColor }) => {
  return (
    <div className='w-1/2 p-4 mx-auto bg-white min-h-40 border  border-grey-500 shadow-md rounded-lg'>
      <h5 className='text-xl font-medium mb-4'>{title}</h5>
      <p className='text-base mb-4'>{shortDescription}</p>
      <ButtonCommon className='font-normal' color={ButtonColor}>
        <Link to={url}>{ButtonText}</Link>
      </ButtonCommon>
    </div>
  );
};

export default HomeItem;
