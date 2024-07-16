import { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';

interface Props {
	sections: string[];
	onSectionSelect?: (section: string) => void;
}

export default function SectionSelector({
	sections,
	onSectionSelect = () => {},
}: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const highlighterRef = useRef<HTMLHRElement>(null);
	const [activeSection, setActiveSection] = useState(0);

	const animateHighlighter = (idx: number) => {
		const element = containerRef.current.children[idx] as HTMLElement;

		animate(
			highlighterRef.current,
			{
				x: element.offsetLeft - 24,
				width: element.offsetWidth + 48,
			},
			{
				duration: 0.15,
				ease: 'easeOut',
			}
		);
	};

	const handleClick = (idx: number) => {
		onSectionSelect(sections[idx]);
		animateHighlighter(idx);
		setActiveSection(idx);
	};

	useEffect(() => {
		animateHighlighter(activeSection);
	}, []);

	return (
		<div
			ref={containerRef}
			className='w-full pb-3 relative border-b border-muted'
		>
			{sections.map((section, idx) => (
				<button
					key={idx}
					onClick={() => handleClick(idx)}
					className='mx-6 font-medium text-xl leading-none tracking-tighter'
					style={{
						color: idx === activeSection ? 'var(--foreground)' : 'var(--muted)',
					}}
				>
					{section}
				</button>
			))}
			<hr
				ref={highlighterRef}
				className='w-0 border-white absolute left-0 bottom-0'
			/>
		</div>
	);
}
