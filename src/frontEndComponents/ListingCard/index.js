import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import HeartOutlineIcon from '@material-ui/icons/FavoriteBorder';
import HeartIcon from '@material-ui/icons/Favorite';
import classnames from 'classnames';
import { capitalize } from '../../utils/stringUtils';
import { Link } from '../../routes';

const styles = theme => ({
  root: {
    minHeight: '400px',
    width: '100%',
    fontFamily: theme.frontEnd.typography.fontFamily.sansSerif2,
    fontSize: '0.9rem',
    transition: 'transform .2s ease-in-out',
    color: 'rgba(0,0,0,.7)',
    '&:hover': {
      transform: 'scale(1.02,1.02)',
    },
  },
  imageWrapper: {
    position: 'relative',
    height: '234px',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  image: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
  },
  infoContentWrapper: {
    padding: '20px 20px',
    border: '1px solid rgba(0,0,0,.2)',
    borderTop: 'none',
  },
  addressWrapper: {
    fontWeight: 600,
    marginBottom: '15px',
    textAlign: 'center',
    cursor: 'pointer',
  },
  neighborhoodWrapper: {
    fontSize: '0.8rem',
    color: 'rgba(0,0,0,.7)',
    marginBottom: '5px',
    textAlign: 'center',
  },
  priceWrapper: {
    marginBottom: '8px',
    textAlign: 'center',
  },
  miscInfo: {
    fontSize: '0.7rem',
    textAlign: 'center',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40px',
    paddingLeft: '15px',
    paddingRight: '15px',
    border: '1px solid rgba(0,0,0,.2)',
    borderTop: 'none',
  },
  heartIcon: {
    marginRight: '5px',
    cursor: 'pointer',
    color: theme.frontEnd.colors.primary.main,
  },
  noFeeWrapper: {
    position: 'absolute',
    top: '7px',
    left: '7px',
    fontSize: '0.7rem',
    color: '#fff',
    backgroundColor: '#12A319',
    padding: '2px 5px',
    borderRadius: '3px',
  },
});

@observer
@withStyles(styles)
class ListingCard extends Component {
  render() {
    const {
      classes,
      featuredPhotoURL,
      otherPhotoURLs,
      address,
      neighborhood,
      price,
      beds,
      baths,
      isLiked,
      isNoFee,
      monthsOfFreeRent,
      sqFootage,
      isStudio,
      type,
      id,
      imageWrapperClassName,
    } = this.props;

    const displayType = dealType => {
      if (!dealType) return;

      const iType = dealType.split(' ')[1];
      const type = iType === 'rental' ? 'rentals' : 'sales';
      return capitalize(type);
    };

    const renderNoticeTag = () => {
      const monthsWord = monthsOfFreeRent >= 2 ? 'Months' : 'Month';
      if (isNoFee && monthsOfFreeRent) {
        return (
          <div className={classes.noFeeWrapper}>
            No Fee {` & ${monthsOfFreeRent} ${monthsWord} Free Rent`}
          </div>
        );
      }

      if (isNoFee) {
        return <div className={classes.noFeeWrapper}>No Fee</div>;
      }

      if (monthsOfFreeRent) {
        return (
          <div
            className={classes.noFeeWrapper}
          >{`${monthsOfFreeRent} ${monthsWord} Free Rent`}</div>
        );
      }

      return null;
    };

    const dealType = displayType(type);

    return (
      <div className={classes.root}>
        <div
          className={classnames(classes.imageWrapper, imageWrapperClassName)}
        >
          <Link route="listing" params={{ id }}>
            <img
              src={featuredPhotoURL}
              alt="listing"
              className={classes.image}
            />
          </Link>
          {renderNoticeTag()}
        </div>

        <div className={classes.infoContentWrapper}>
          <Link route="listing" params={{ id }}>
            <div className={classes.addressWrapper}>{address}</div>
          </Link>
          <div className={classes.neighborhoodWrapper}>
            {dealType ? `${dealType} | ` : null} {neighborhood}
          </div>
          <div className={classes.priceWrapper}>
            ${price ? price.toLocaleString() : null}
          </div>
          <div className={classes.miscInfo}>
            {isStudio ? 'Studio' : `${beds} BD`} | {`${baths} BA`}
          </div>
        </div>

        <div className={classes.footer}>
          {isLiked ? (
            <HeartIcon color="inherit" classes={{ root: classes.heartIcon }} />
          ) : (
            <HeartOutlineIcon
              color="inherit"
              classes={{ root: classes.heartIcon }}
            />
          )}{' '}
          Favorite
        </div>
      </div>
    );
  }
}

export default ListingCard;
