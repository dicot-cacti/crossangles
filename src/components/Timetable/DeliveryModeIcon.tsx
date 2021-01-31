import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import OnlineIcon from '@material-ui/icons/Laptop';
import PersonIcon from '@material-ui/icons/Person';
import { DeliveryType } from '../../state';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.85,
  },
  iconSlash: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(0.5),
    marginTop: theme.spacing(0.25),
  },
  padded: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export interface Props {
  delivery: DeliveryType,
  padded: boolean,
}

const DeliveryTypeIconBase: React.FC<Props> = ({ delivery, padded }: Props) => {
  const classes = useStyles();
  const rootClasses = [classes.root];
  if (padded) {
    rootClasses.push(classes.padded);
  }

  return (
    <div className={rootClasses.join(' ')}>
      {delivery !== DeliveryType.person && <OnlineIcon />}
      {delivery === DeliveryType.either || delivery === DeliveryType.mixed ? (
        <span className={classes.iconSlash}>/</span>
      ) : null}
      {delivery !== DeliveryType.online && <PersonIcon />}
    </div>
  );
};
export const DeliveryTypeIcon: React.FC<Props> = React.memo(DeliveryTypeIconBase);

export default DeliveryTypeIcon;
