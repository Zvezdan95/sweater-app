'use client'
import Link from "next/link";
import React, {useEffect, useRef, useState} from "react";
import {Chart, registerables} from 'chart.js';
import {usePathname, useSearchParams} from "next/navigation";
import {GetSheetDataResponse, initGetSheetDataResponse} from "@/types/GetSheetDataResponse";
import {GetSheetDataQueryParams} from "@/types/GetSheetDataQueryParams";

Chart.register(...registerables);

type CachedData = Map<string, GetSheetDataResponse>

export default function AdminPage() {
    const chartRef = useRef<Chart | null>(null);
    const pathname = usePathname();
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState('');
    const [cachedData, setCachedData] = useState<CachedData>(new Map());
    const [data, setData] = useState(initGetSheetDataResponse());
    const searchParams = useSearchParams();
    const maxPage = Math.ceil(data.totalRequests / 10);

    useEffect(() => {
        const url = new URL(window.location.href);
        const pageParam = url.searchParams.get('page');
        const sortParam = url.searchParams.get('sort');

        if (pageParam) {
            setCurrentPage(parseInt(pageParam, 10));
        }
        if (sortParam) {
            setSort(sortParam);
        }

        const cacheKey = `${pageParam}-${sortParam}`;
        const cachedDataValue = cachedData.get(cacheKey);

        if (cachedDataValue) {
            setData(cachedDataValue);
            makeChart(cachedDataValue);
        } else {
            getData(pageParam, sortParam).then(makeChart);
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [currentPage, sort, searchParams]);

    const hrefParams: { query: { sort?: string | null, page?: number | null }, pathname: string | null } = {
        pathname: pathname,
        query: {}
    };

    if (sort) {
        hrefParams.query.sort = sort;
    }

    if (currentPage && currentPage !== 1) {
        hrefParams.query.page = currentPage;
    }

    function makeChart(newData: GetSheetDataResponse) {
        const ctx = document.getElementById("chart") as HTMLCanvasElement; // Correct type assertion
        if (ctx) {
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Left Shelf",
                        "Middle Left Shelf",
                        "Middle Right Shelf",
                        "Right Shelf"
                    ],
                    datasets:
                        [{
                            label: 'Total number of submitted sweaters per foundation',
                            data: [
                                newData.totalLefShelf,
                                newData.totalMiddleLefShelf,
                                newData.totalMiddleRightShelf,
                                newData.totalRightShelf
                            ],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    async function getData(pageParam: (string | null), sortParam: (string | null)): Promise<GetSheetDataResponse> {
        const cacheKey = `${pageParam}-${sortParam}`;
        const params = [
            {key: "page", value: pageParam},
            {key: "sort", value: sortParam}]
            .filter(str => str.value && str.value.trim() !== "")
            .map(({key, value}) => `${key}=${value}`)
            .join("&");

        return fetch(`/api/get-sheet-data?${params}`)
            .then(response => response.json())
            .then(newData => {
                setData(newData);
                setCachedData(prevCache => prevCache.set(cacheKey, newData));
                return newData;

            });
    }

    function handleOnDelete(tableIndex: number) {
        const getSheetDataQueryParams = new GetSheetDataQueryParams({
            "sort": sort,
            "page": currentPage.toString()
        });

        const {startRowIndex} = getSheetDataQueryParams.toRowIndexRage(data.totalRequests);

        const deleteIndex = getSheetDataQueryParams.isAscending() ? tableIndex + startRowIndex : startRowIndex - tableIndex;
        fetch('/api/delete-row', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rowIndex: deleteIndex
            }),
        })
            .then(r => getData(currentPage.toString(), sort));


    }

    return (
        <main
            className="flex min-h-screen flex-col gap-y-8 bg-custom-blue-100 items-center relative m-4 text-custom-blue-500 bg-white rounded-md p-8">
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <Link href="/" className="hover:text-custom-blue-400 transition-color duration-500">go back to home</Link>
            <div className="flex flex-col lg:flex-row gap-2 border-soild border border-custom-blue-100 rounded p-2">
                <h2 className={"text-xl p-1 bg-custom-blue-100 rounded"}>Total number of submitted requests
                    : {data.totalRequests}</h2>
                <h2 className={"text-xl p-1 bg-custom-blue-100 rounded"}>lastRequestCreateAt: {toFormatedTime(data.lastRequestCreateAt as number)}</h2>
            </div>

            <canvas id="chart" className={"max-w-[64rem]"}></canvas>
            <div className="flex flex-row gap-x-4">
                {<Link
                    href={{...hrefParams, query: {...hrefParams.query, sort: "ascending"}}}
                    scroll={false}
                    legacyBehavior
                    passHref
                >
                    <span
                        className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r`}
                    >
                        Sort By Ascending
                    </span>
                </Link>}
                <Link
                    href={{...hrefParams, query: {...hrefParams.query, sort: "descending"}}}
                    scroll={false}
                    legacyBehavior
                    passHref
                >
                    <span
                        className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r`}
                    >
                        Sort By Descending
                    </span>
                </Link>
            </div>

            <div className="overflow-x-auto w-full">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">

                    <tr>
                        {["Left Shelf", "Middle Left Shelf", "Middle Right Shelf", "Right Shelf", "IP", "Created At", "Action"].map((header, index) => (
                            <th
                                key={header + index.toString()}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {header}

                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {(data?.rows ?? []).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {Object.values(row).map((cell, cellIndex) => (
                                <td key={rowIndex + cellIndex}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">

                                    {cellIndex === Object.values(row).length - 1 ? toFormatedTime(cell as number) : cell}
                                </td>
                            ))}
                            <td
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button
                                    onClick={() => handleOnDelete(rowIndex)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-color duration-500">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                {currentPage !== 1 && <Link
                    href={{...hrefParams, query: {...hrefParams.query, page: currentPage - 1}}}
                    legacyBehavior
                    passHref

                    scroll={false}>
                    <a
                        className={`transition-color duration-500 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l`}>
                        Previous
                    </a>
                </Link>}
                <span className="bg-gray-300 text-gray-800 font-bold py-2 px-4">
                  Page {currentPage}
                </span>
                {currentPage < maxPage && <Link
                    href={{...hrefParams, query: {...hrefParams.query, page: currentPage + 1}}}
                    legacyBehavior
                    passHref
                    scroll={false}>
                    <a className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r transition-color duration-500`}>
                        Next
                    </a>
                </Link>}
            </div>
        </main>
    );
}

function toFormatedTime(time: number): string {
    return (new Date(time)).toLocaleString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}