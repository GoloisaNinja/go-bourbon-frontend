import { useEffect, useRef } from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import styles from './BourbonPricing.module.scss';

const BourbonPricing = ({ pricingArray, handleShop }) => {
	const node_1 = useRef(null);
	const node_2 = useRef(null);
	const node_3 = useRef(null);
	const node_4 = useRef(null);
	const node_5 = useRef(null);

	const returnNodeRef = async (num) => {
		switch (num) {
			case 1:
				return node_1;
			case 2:
				return node_2;
			case 3:
				return node_3;
			case 4:
				return node_4;
			case 5:
				return node_5;
			default:
				return null;
		}
	};

	useEffect(() => {
		const assignPriceStyle = async () => {
			if (pricingArray.length > 0) {
				for (let i = 0; i < pricingArray.length; i++) {
					const element = await returnNodeRef(i + 1);
					element.current.className = `${styles.price} ${styles.active}`;
				}
			}
		};
		assignPriceStyle();
	}, [pricingArray]);

	return (
		<div className={styles.price_container}>
			<div>
				<p>Price </p>
				<p className={styles.price} ref={node_1}>
					🥃
				</p>
				<p className={styles.price} ref={node_2}>
					🥃
				</p>
				<p className={styles.price} ref={node_3}>
					🥃
				</p>
				<p className={styles.price} ref={node_4}>
					🥃
				</p>
				<p className={styles.price} ref={node_5}>
					🥃
				</p>
			</div>

			<div>
				<button onClick={() => handleShop()}>
					<HiOutlineShoppingCart /> Shop
				</button>
			</div>
		</div>
	);
};

export default BourbonPricing;
