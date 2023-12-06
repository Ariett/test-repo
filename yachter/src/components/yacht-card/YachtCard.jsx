import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import AuthContext from '../../contexts/authContext';
import MemberContext from '../../contexts/memberContext';

import Path from '../../paths';
import { pathToUrl } from '../../utils/pathUtils';

import { trimWords } from '../../utils/generalUtils';

import style from './YachtCard.module.scss'
import DatePickerComponent from '../form-elements/date-picker/DatePickerComponent';
import DatePickerButton from '../form-elements/date-picker-btn/DatePickerButton';

export default function YachtCard({
    _id,
    _ownerId,
    images,
    name,
    description,
    deleteYachtHandler = false
}) {
    const { isAuthenticated, userId, isYachtsOwner } = useContext(AuthContext);
    const { memberFavoriteYachts, likeClickHandler, removeLikeClickHandler, bookingHandler } = useContext(MemberContext);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (memberFavoriteYachts.length > 0) {
            setIsFavorite(memberFavoriteYachts.some(favYacht => favYacht._id === _id));
        }
    }, [memberFavoriteYachts]);

    const deleteButtonClickHandler = () => {
        deleteYachtHandler(_id, name);
    };

    const onIconClickHandler = () => {
        setIsFavorite(!isFavorite);
        if (!isFavorite) {
            likeClickHandler(_id);
        } else {
            removeLikeClickHandler(_id);
        }
    };

    const onBookingCLick = () => {
        bookingHandler(_id);
    };

    let imageUrl = "/images/black-yachter.png";
    if (images.length > 0) {
        imageUrl = images[0];
    }

    let iconClass = isFavorite ? 'solid' : 'regular';

    return (
        <Card style={{ width: '18rem' }} className={style.yachtCard}>
            <div className={style.yachtCardImgWrapper}>
                {isAuthenticated && !isYachtsOwner && (
                    <i
                        className={`fa-heart fa-${iconClass} ${style.favoriteIcon}`}
                        onClick={onIconClickHandler}
                    >
                        <span className={style.toolTip}>{isFavorite ? "Added!" : "Add to favorites"}</span>
                    </i>
                )}

                <Card.Img
                    variant="top"
                    src={imageUrl}
                    className={(images.length === 0) ? style.imgContain : ''}
                />
            </div>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                {(userId !== _ownerId) && (
                    <>
                        <Card.Text>{trimWords(description, 5)}</Card.Text>
                        <Button variant="primary" as={Link} to={`/yachts/${_id}`}>Details</Button>
                    </>
                )}

                {/* Members only */}
                {isAuthenticated && !isYachtsOwner && (
                    <DatePickerButton
                        btnText="Book"
                        btnVariant="secondary"
                        btnStyle={{ marginLeft: "10px" }}
                        yachtId={_id}
                    >
                        Book yacht
                    </DatePickerButton>
                )}

                {(userId === _ownerId) && (
                    <>
                        <Button
                            variant="secondary"
                            as={Link}
                            to={pathToUrl(Path.OwnerYachtsEdit, { id: _id })}
                            style={{ marginLeft: "10px" }}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="danger"
                            onClick={deleteButtonClickHandler}
                            style={{ marginLeft: "10px" }}
                        >
                            Delete
                        </Button>
                    </>
                )}
            </Card.Body>
        </Card>
    )
}