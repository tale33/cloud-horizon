import React from 'react';

export default function  List(props) {
    if (props.error) {
        return <div className={'message'}>Error: {props.error.message}</div>;
    } else if (!props.isLoaded) {
        return (<div>
            <div className={'message'}>
                <ul className={'loading'}>
                    <li key={'loading'}>Loading...</li>
                </ul>
            </div>
        </div>);
    } else {
        return (
            <div>
                <ol start={props.start} className={'list lightGray'}>
                    {props.items.map(item => (
                        <li key={item.id}>
                            <div>
                                <a className={'darkGray'} href={item.url} target={'_blank'} rel={'noopener noreferrer'}>{item.title} </a>
                                <a className={'lightGray'}
                                   href={item.url ? '//' + item.url.match(/(?:[a-z0-9][^www.](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/)[0] : ''}
                                   target={'_blank'}
                                   rel={'noopener noreferrer'}>
                                    ({item.url ? item.url.match(/(?:[a-z0-9][^www.](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/)[0] : ''})
                                </a>
                            </div>
                            <div className={'darkGray'}>
                                {item.score} points <span className={'lightGray'}>
                                by</span> {item.by} <a className={'lightGray'}
                                                       href={'https://news.ycombinator.com/item?id=' + item.id}
                                                       target={'_blank'}
                                                       rel={'noopener noreferrer'}>{item.descendants} comments</a>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        );
    }
}