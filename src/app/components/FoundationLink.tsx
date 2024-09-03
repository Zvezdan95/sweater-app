import Image from "next/image";

export enum FoundationLinkType {
    TextLink,
    IconLink
}

interface FoundationLinkProps {
    linkUrl: string,
    linkType: FoundationLinkType,
}

export function FoundationLink({linkUrl, linkType}: FoundationLinkProps) {
    return (
        <a href={"https://" + linkUrl}
           target="_blank"
           className="text-base text-custom-blue-100">
            {
                {
                    [FoundationLinkType.TextLink]: String(linkUrl),
                    [FoundationLinkType.IconLink]: <Image src="/linkIcon.png"
                                                          alt="link icon"
                                                          width={32}
                                                          height={32}
                                                          className={"min-w-8 min-h-8"}/>,
                }[linkType]
            }
        </a>
    );
}