import React from 'react';
import  './BookCard.css';

export default function BookCard({ booksData})  {
	
return (
	<div className="night-theme">
		{booksData.map((item) => (
			<div key={item.id} className="card">
				<img src={`../images/${item.coverImg}`} />
				<div className="card-content">
				    <p className="card-title">{item.title}</p>
					<p className="card-author">
					By {item.author} ({item.publishDate})
				</p>
				
				</div>
			</div>
		))}
	</div>
);
}