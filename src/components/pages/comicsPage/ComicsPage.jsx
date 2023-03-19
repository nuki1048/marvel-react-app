import React from "react";
import AppBanner from "../../appBaner/AppBanner";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import ComicsList from "../../comicsList/ComicsList";
import AnimatedComponent from "../../animatedComponent/AnimatedComponent";

const ComicsPage = () => {
	return (
		<AnimatedComponent>
			<AppBanner />
			<ErrorBoundary>
				<ComicsList />
			</ErrorBoundary>
		</AnimatedComponent>
	);
};

export default ComicsPage;
