import { useRef } from 'react';
import { useEffect } from 'react';
import styles from './Types.module.css';

const Types = ({ types, selectedTypes, setSelectedTypes }) => {
	const typesContainerRef = useRef();

	const handleTypeClick = (type) => {
		const typeName = type.target.innerText;

		if (selectedTypes.includes(typeName)) {
			setSelectedTypes(
				selectedTypes.filter((selectedType) => selectedType !== typeName)
			);
		} else {
			setSelectedTypes([...selectedTypes, typeName]);
		}

        console.log(selectedTypes);
	};

	useEffect(() => {
		const buttons = typesContainerRef.current.children;
		Array.from(buttons).forEach((button) => {
			if (selectedTypes.includes(button.innerText)) {
				button.classList.add(styles.type_selected);
			} else {
				button.classList.remove(styles.type_selected);
			}
		});
	}, [selectedTypes]);

	return (
		<div ref={typesContainerRef}>
			{types.map((type) => {
				return (
					<button
						type='button'
						onClick={handleTypeClick}
						key={type}
						className={styles.type}
					>
						{type}
					</button>
				);
			})}
		</div>
	);
};

export default Types;