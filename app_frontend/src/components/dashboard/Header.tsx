type Order = {
	_id: string;
	orderDate: string;
	products: object[];
	totalPrice: number;
	status: string;
	userId: string;
	telephone: string;
};

type OrderProps = {
	orders: Order[];
};

const Header = ({ orders }: OrderProps) => {
	return <>Hello world</>;
};

export default Header;
