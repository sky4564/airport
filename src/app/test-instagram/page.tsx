'use client';

import { useState } from 'react';
import InstagramFeed from '@/components/ui/InstagramFeed';

export default function TestInstagramPage() {
  const [useMockData, setUseMockData] = useState(true);
  const [limit, setLimit] = useState(6);
  const [accessToken, setAccessToken] = useState('');
  const [userId, setUserId] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 페이지 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Instagram Feed 테스트 페이지
          </h1>
          <p className="text-gray-600">
            인스타그램 피드 컴포넌트의 다양한 기능을 테스트해보세요
          </p>
        </div>

        {/* 컨트롤 패널 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">설정 옵션</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 데이터 소스 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                데이터 소스
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="dataSource"
                    value="mock"
                    checked={useMockData}
                    onChange={() => setUseMockData(true)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">모킹 데이터 사용</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="dataSource"
                    value="api"
                    checked={!useMockData}
                    onChange={() => setUseMockData(false)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">실제 API 사용</span>
                </label>
              </div>
            </div>

            {/* 포스트 개수 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                표시할 포스트 개수
              </label>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={3}>3개</option>
                <option value={6}>6개</option>
                <option value={9}>9개</option>
                <option value={12}>12개</option>
              </select>
            </div>

            {/* API 설정 (실제 API 사용 시에만 표시) */}
            {!useMockData && (
              <div className="md:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram Access Token
                </label>
                <input
                  type="text"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  placeholder="Instagram Access Token 입력"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="block text-sm font-medium text-gray-700 mb-2 mt-3">
                  Instagram User ID
                </label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Instagram User ID 입력"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* API 안내 */}
          {!useMockData && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Instagram API 설정 안내</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p>• Facebook Developer Console에서 Instagram Basic Display API 또는 Instagram Graph API 설정이 필요합니다.</p>
                <p>• Access Token은 Instagram 계정에 대한 읽기 권한이 있어야 합니다.</p>
                <p>• User ID는 Instagram 계정의 고유 식별자입니다.</p>
                <p>• 개발 환경에서는 모킹 데이터를 사용하는 것을 권장합니다.</p>
              </div>
            </div>
          )}

          {/* 모킹 데이터 안내 */}
          {useMockData && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2">모킹 데이터 사용 중</h3>
              <p className="text-sm text-green-800">
                현재 프로젝트의 차량 이미지를 사용한 샘플 인스타그램 포스트를 표시합니다.
                실제 API 연동 없이 컴포넌트의 동작을 확인할 수 있습니다.
              </p>
            </div>
          )}
        </div>

        {/* 인스타그램 피드 컴포넌트 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <InstagramFeed
            accessToken={accessToken}
            userId={userId}
            limit={limit}
            useMockData={useMockData}
            className="w-full"
          />
        </div>

        {/* 컴포넌트 사용법 안내 */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">컴포넌트 사용법</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">기본 사용법 (모킹 데이터)</h3>
              <div className="bg-gray-100 rounded-lg p-4">
                <code className="text-sm text-gray-800">
                  {`<InstagramFeed useMockData={true} limit={6} />`}
                </code>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">실제 API 사용</h3>
              <div className="bg-gray-100 rounded-lg p-4">
                <code className="text-sm text-gray-800">
                  {`<InstagramFeed 
  accessToken="your_access_token"
  userId="your_user_id"
  limit={6}
  useMockData={false}
/>`}
                </code>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Props 설명</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prop
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Default
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        accessToken
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        string?
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        undefined
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        Instagram API 액세스 토큰
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        userId
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        string?
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        undefined
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        Instagram 사용자 ID
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        limit
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        number
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        6
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        표시할 포스트 개수
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        useMockData
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        boolean
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        true
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        모킹 데이터 사용 여부
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        className
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        string
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        &quot;&quot;
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        추가 CSS 클래스
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 